import * as shell from "shelljs";

shell.rm('-rf', 'dist/public/');
shell.rm('-rf', 'dist/views/');
shell.cp("-R", "src/public/", "dist/public/");
shell.cp("-R", "src/views/", "dist/views/");
