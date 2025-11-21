import { db } from '../init-firebase';

const COLLECTION = 'whatsapp_auth';

export const useFirestoreAuthState = async (sessionId: string) => {
    // Dynamic import for ESM compatibility
    const { initAuthCreds, BufferJSON, proto } = await import('@whiskeysockets/baileys');

    const docRef = db.collection(COLLECTION).doc(sessionId);

    const writeData = async (data: any, id: string) => {
        await docRef.collection('keys').doc(id).set({
            value: JSON.stringify(data, BufferJSON.replacer)
        }, { merge: true });
    };

    const readData = async (id: string) => {
        try {
            const doc = await docRef.collection('keys').doc(id).get();
            if (doc.exists) {
                const data = doc.data();
                return JSON.parse(data?.value, BufferJSON.reviver);
            }
            return null;
        } catch (error) {
            return null;
        }
    };

    const removeData = async (id: string) => {
        try {
            await docRef.collection('keys').doc(id).delete();
        } catch (error) {
            // Ignore
        }
    };

    const credsDoc = await docRef.get();
    let creds: any; // Typed as AuthenticationCreds in runtime
    
    if (credsDoc.exists) {
        const data = credsDoc.data();
        creds = JSON.parse(data?.creds, BufferJSON.reviver);
    } else {
        creds = initAuthCreds();
    }

    return {
        state: {
            creds,
            keys: {
                get: async (type: string, ids: string[]) => {
                    const data: { [key: string]: any } = {};
                    await Promise.all(ids.map(async id => {
                        let value = await readData(`${type}-${id}`);
                        if (type === 'app-state-sync-key' && value) {
                            value = proto.Message.AppStateSyncKeyData.fromObject(value);
                        }
                        data[id] = value;
                    }));
                    return data;
                },
                set: async (data: any) => {
                    const tasks: Promise<void>[] = [];
                    for (const category in data) {
                        for (const id in data[category]) {
                            const value = data[category][id];
                            const key = `${category}-${id}`;
                            if (value) {
                                tasks.push(writeData(value, key));
                            } else {
                                tasks.push(removeData(key));
                            }
                        }
                    }
                    await Promise.all(tasks);
                }
            }
        },
        saveCreds: async () => {
            await docRef.set({
                creds: JSON.stringify(creds, BufferJSON.replacer)
            }, { merge: true });
        }
    };
};
