#!/usr/bin/env -S deno run --allow-net

const isIPAddress = (hostnameOrIP: string): boolean => {
  const ipRegex = /(\d{1,3}\.?){4}/;
  return ipRegex.test(hostnameOrIP)
}

const hostnameLookup = async (hostname: string): Promise<string> => {
  const lookupHost = hostname;

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
  // Fail quickly if it is an invalid command
  if (!isValidCommand(command)) {
    console.error('Invalid command')
    return;
  }

  // Fail quickly before any lookup
  if (!hostnameOrIP) {
    console.error('Invalid hostname or IP address')
    return;
  }

  const target = (isIPAddress(hostnameOrIP) ? hostnameOrIP : await hostnameLookup(hostnameOrIP));
  const url = `http://${target}:8060/keypress/${command}`;

  // Fail after a DNS lookup
  if (!target) {
    console.error('Invalid hostname or IP address')
    return;
  }

  console.log(`Making '${command}' request: ${url}`);
  await fetch(url, { method: 'POST' });
};

const validCommands = [
  'Home',
  'Select',
  'Up',
  'Down',
  'Left',
  'Right',
  'Back',
  'Fwd',
  'Rev',
  'Play',
  'InstantReplay',
  'Info',
  'VolumeUp',
  'VolumeDown',
  'VolumeMute',
  'Search',
  'Enter',
  'InputSource',
  'Power',
  'Backspace',
  'Game',
  'Sleep',
  'ClosedCaption',
  'PowerOn',
  'PowerOff',
  'InputAV1',
  'InputHDMI1',
  'InputHDMI2',
  'InputHDMI3',
  'InputHDMI4',
  'InputTuner',
  'Partner1', // Netflix
  'Partner2', // Pandora
  'Partner3', // Crackle
  'Partner4', // VUDU
  'Partner5', // NOW TV
  'Partner6', // Roku Channel Store
  'Partner7', // M-GO
  'Partner8', // Amazon Video
  'Partner9', // Blockbuster
  'Partner10', // Rdio
  'Partner11', // CinemaNow
  'Partner12', // Sling TV
  'Partner13', // Hulu
  'Partner14', // Google Play
  'Partner15', // Cinexplex
  'Partner16', // YouTube
  'Partner17', // Sky Store
  'Partner18', // HBO NOW
  'Partner19', // Showtime
  'Partner20', // Red Bull TV
  'Partner21', // Spotify
  'Partner22', // CBS News
  'Partner23', // Cinepolis Klic
  'Partner24', // TED
  'Partner25', // BLIM
  'Partner26', // Playstation Vue
  'Partner27', // VMedia
  'Partner28', // Starz
];

const isValidCommand = (command: string): boolean => {
  const litRe = /^lit_%\d+/i;
  const valid = validCommands.includes(command) || litRe.test(command);
  return valid;
}

const main = async () => {
  const target = Deno.args[0] || '75tclrokutv.local';
  const command = Deno.args[1] || 'Info';
  await rokuCommand(target, command);
};

main();