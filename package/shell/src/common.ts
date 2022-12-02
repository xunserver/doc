import child_process, { SpawnOptions } from "child_process";

const defaultOptions: SpawnOptions = {
  shell: true,
  stdio: [process.stdin, process.stdout, process.stderr],
};

interface Callback {
  (err: Error | null, data: any): void;
}

function exec(cmd: string, callback?: Callback): any;
function exec(cmd: string, options?: SpawnOptions, callback?: Callback): any;
function exec(
  cmd: string,
  options?: SpawnOptions | Callback,
  callback?: Callback
): any {
  if (typeof options === "function" && callback === undefined) {
    callback = options;
    options = defaultOptions;
  }
  return child_process.spawn(cmd, options as SpawnOptions);
}

exec("ls");
