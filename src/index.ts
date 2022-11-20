import {keccak_256} from 'js-sha3';
import uts46 from 'idna-uts46-hx'

export const hash = (inputName: string) => {
	let node = '0000000000000000000000000000000000000000000000000000000000000000';
	const name = normalize(inputName);
	if (name) {
		const labels = name.split('.');
		for(var i = labels.length - 1; i >= 0; i--) {
			node = keccak_256(Buffer.from(node + keccak_256(labels[i]), 'hex'));
		}
	}
	return '0x' + node;
}

export const normalize = (name: string) => name ? uts46.toUnicode(name, {useStd3ASCII: true}) : name;

export default {hash, normalize};