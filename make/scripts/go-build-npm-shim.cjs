#!/usr/bin/env node

const {basename, join, dirname} = require("path");
const {existsSync, readFileSync} = require("fs");
const {execFileSync} = require("child_process");

const baseDir = dirname(__dirname);
let basePkg;
try {
    basePkg = readPackage(baseDir);
} catch (e) {
    exitReadBasePackage(e);
}
const wantName = `${basePkg.name}-${process.platform}-${process.arch}`;
if (!basePkg.optionalDependencies[wantName]) {
    exitUnsupportedPlatform(basePkg);
}
const binPath = Object.values(basePkg.bin)[0];
let absBinPath;
try {
    absBinPath = require.resolve(join(wantName, binPath));
} catch (e) {
    exitMissingPlatformBinary(basePkg);
}
execFileSync(absBinPath, process.argv.slice(2), {stdio: 'inherit', cwd: process.cwd(), env: process.env});

function exitReadBasePackage(error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`${basename(__filename)}: ${message}\n`);
    process.exit(1);
}

function exitUnsupportedPlatform(basePkg) {
    process.stderr.write(`${basePkg.name}: unsupported platform/architecture: ${process.platform}/${process.arch}\n`);
    process.exit(1);
}

function exitMissingPlatformBinary(basePkg) {
    process.stderr.write(`${basePkg.name}: binary for ${process.platform}/${process.arch} is missing\n`);
    process.exit(1);
}

function readPackage(dir) {
    const pkgPath = join(dir, "package.json");
    if (!existsSync(pkgPath)) {
        throw new Error(`invalid npm-base: ${pkgPath} not found`);
    }
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    if (!pkg.name) {
        throw new Error(`${pkgPath} is missing "name"`);
    }
    if (!pkg.bin) {
        throw new Error(`${pkgPath} is missing "bin"`);
    }
    if (Object.keys(pkg.bin).length !== 1) {
        throw new Error(`${pkgPath} is requires exactly one entry in "bin"`);
    }
    const binName = Object.keys(pkg.bin)[0];
    const binValue = Object.values(pkg.bin)[0];
    if (
        binName === undefined ||
        binValue === undefined ||
        binValue !== `bin/${binName}`
    ) {
        throw new Error(
            `${pkgPath} is missing an entry in "bin" in the form of {"foo": "bin/foo"}`
        );
    }
    return pkg;
}
