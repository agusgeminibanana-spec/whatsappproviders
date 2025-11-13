{ pkgs, ... }: {
  # The channel to use.
  channel = "stable-23.11";

  # The packages to make available in the environment.
  packages = [
    pkgs.nodejs_20
  ];

  # IDX-specific configuration.
  idx.previews = {
    enable = true;
    previews = {
      "Web" = {
        # The command to start the preview.
        command = [ "npm" "run" "dev" ];
        # Use the web manager to handle port forwarding.
        manager = "web";
      };
    };
  };
}
