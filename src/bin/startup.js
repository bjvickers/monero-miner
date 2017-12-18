'use strict'

const log = require('../services/log')
const CoinHive = require('coin-hive');

(async () => {

  log.info({}, 'Creating miner...')
  const miner = await CoinHive('I11K3gMRbeA1AM1ndWV2ZaMKPTvvLfzj')
  log.info({}, 'Miner created.')

  log.info({}, 'Starting miner...')
  await miner.start();
  log.info({}, 'Miner started.')

  // Listen on events
  miner.on('found', () => log.info({}, 'Found!'))
  miner.on('accepted', () => log.info({}, 'Accepted!'))

  let counter = 0
  miner.on('update', (data) => {
    counter++
    if (counter > 10) {
      log.info({}, `
        Hashes per second: ${data.hashesPerSecond}
        Total hashes: ${data.totalHashes}
        Accepted hashes: ${data.acceptedHashes}
      `)
      counter = 0
    }
  });

  // Stop miner
  // setTimeout(async () => await miner.stop(), 60000);
})()
