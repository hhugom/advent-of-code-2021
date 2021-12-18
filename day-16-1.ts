import fs from 'fs';

function hex2bin(hex: string){
  let result: string[]= [];
  for (var i=0; i < hex.length; i+=2) {
    result.push(`${hex[i]}${hex[i+1]}`);
  };

  return result.map(hexVal => parseInt(hexVal, 16).toString(2).padStart(8, '0')).join('');
}

type LiteralValueInfos = {
  value: number,
  binaryLength: number,
}

type PackageInfos = {
  typeId: number, 
  version: number, 
  lengthTypeId: number
}

function parseLiteralValue(binary: string):LiteralValueInfos {
  let lastPacket = false;
  let binaryValue = '';
  let start = 6;
  do {
    const bit = binary.substr(start, 5);
    binaryValue += bit.substr(1);
    lastPacket = bit.charAt(0) === '0';
    start+=5;
  } while(!lastPacket)
  return {value: parseInt(binaryValue, 2), binaryLength:start };
}

function getPackageInfos(packet: string): PackageInfos {
  const version = parseInt(packet.substr(0,3), 2);
  const typeId = parseInt(packet.substr(3,3), 2);
  const lengthTypeId = parseInt(packet.substr(6,1), 2);
  return {typeId, version, lengthTypeId};
}

function getLengthTypeIdZero(packet: string) {
  return parseInt(packet.substr(7,15), 2);
}

function getLengthTypeIdOne(packet: string) {
  return parseInt(packet.substr(7,11), 2);
}

let totalVersion:number[] = [];

function parsePacket(infos: PackageInfos, packets: string) {
  totalVersion.push(infos.version);

  if(infos.typeId === 4) {
    const subInfos = parseLiteralValue(packets);
    return {length: subInfos.binaryLength};
  }
   
  if(infos.lengthTypeId === 0) {
    const subpacketsLength = getLengthTypeIdZero(packets);
    const binaryLength = 22 + subpacketsLength
    let subPackets = packets.substr(22, subpacketsLength);
   
    do {
      const subPacketsInfos = getPackageInfos(subPackets);
      const subInfos = parsePacket(subPacketsInfos, subPackets);
      subPackets = subPackets.substr(subInfos.length);
    } while(subPackets.includes('1'))

    return {length: binaryLength}
  }


  const subpacketNumber = getLengthTypeIdOne(packets);
  
  let subPackets = packets.substr(18);
  let totalPackets = 0;
  let totalLength = 18; 

  do {
    const subPacketsInfos = getPackageInfos(subPackets);
    const {length} = parsePacket(subPacketsInfos, subPackets);
    subPackets = subPackets.substr(length);
   
    totalPackets++;
    totalLength += length;
  } while(totalPackets < subpacketNumber)

  return {length: totalLength};
}



function day16_1() {
  const data = fs.readFileSync('./inputs/day-16.txt', 'utf8');
  const binaryData = hex2bin(data);
  const infos = getPackageInfos(binaryData.substr(0, 7));
  parsePacket(infos, binaryData);
  return totalVersion.reduce((p,v) => p + v, 0);
}


process.stdout.write(`${day16_1()}`);
