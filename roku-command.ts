#!/usr/bin/env -S deno run --allow-net

const isIPAddress = (hostnameOrIP: string): boolean => {
  const ipRegex = /(\d{1,3}\.?){4}/;
  return ipRegex.test(hostnameOrIP)
}

const hostnameLookup = async (hostname: string): Promise<string> => {
  var lookupHost = hostname;

  console.info(`Looking up hostname: ${hostname}`);
  const a = await Deno.resolveDns(lookupHost, 'A');
  const res = (isIPAddress(a[0]) ? a[0] : '');

  if (res) {
    console.info(`Successful response for hostname: ${res}`);
  } else {
    console.warn(`Failed response for hostname: ${res}`);
  }

  return res;
};

const rokuCommand = async (hostnameOrIP:string, command: string): Promise<void> => {
  const target = await hostnameLookup(hostnameOrIP);
  const url = `http://${target}:8060/keypress/${command}`;

  if (target) {
    console.log(`Making '${command}' request: ${url}`);
    await fetch(url, { method: 'POST' });
  }
};

const main = async () => {
  const target = Deno.args[0] || '75tclrokutv.local';
  const command = Deno.args[1] || 'Info';
  await rokuCommand(target, command);
};

main();