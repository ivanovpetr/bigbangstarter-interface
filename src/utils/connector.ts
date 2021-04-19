import { Lock } from '@snapshot-labs/lock/src';
import injected from '@snapshot-labs/lock/connectors/injected';


// Init Lock
const lock = new Lock();

// Add injected connector
lock.addConnector({
    key: 'injected',
    connector: injected
});

export default lock