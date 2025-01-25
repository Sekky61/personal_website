{
  description = "Personal Website";

  inputs = {
    nixpkgs.url = "nixpkgs";
    systems.url = "github:nix-systems/x86_64-linux";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.systems.follows = "systems";
    };
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      packageJson = builtins.fromJSON (builtins.readFile web/package.json);
      pkgs = nixpkgs.legacyPackages.${system};
      pname = packageJson.name;
      version = packageJson.version;
      buildInputs = with pkgs; [
        bun
      ];
      nativeBuildInputs = buildInputs;
      npmDepsHash = ""; # <prefetch-npm-deps package-lock.json>
    in {
      devShells.default = pkgs.mkShell {
        inherit buildInputs;
      };
      packages.default = pkgs.buildNpmPackage {
        inherit pname version buildInputs npmDepsHash nativeBuildInputs;
        src = ./web;
        postInstall = ''
          mkdir -p $out/bin
          exe="$out/bin/${pname}"
          lib="$out/lib/node_modules/${pname}"
          cp -r ./.next $lib
          touch $exe
          chmod +x $exe
          echo "
              #!/usr/bin/env bash
              cd $lib
              ${pkgs.bun}/bin/bun run start" > $exe
        '';
      };
    });
}
