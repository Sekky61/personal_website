{
  description = "Personal Website";

  inputs = {
    nixpkgs.url = "nixpkgs";
    systems.url = "github:nix-systems/x86_64-linux";
    playwright.url = "github:pietdevries94/playwright-web-flake/1.58.1";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.systems.follows = "systems";
    };
  };

  outputs = {
    nixpkgs,
    flake-utils,
    playwright,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            (_final: _prev: {
              inherit
                (playwright.packages.${system})
                playwright-test
                playwright-driver
                ;
            })
          ];
        };
        devShellPackages = with pkgs; [
          bun
          playwright-driver.browsers
        ];
      in {
        devShells.default = pkgs.mkShell {
          packages = devShellPackages;

          shellHook = ''
            export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
          '';
        };
      }
    );
}
