import test from 'tape';
import namehash from '../src';

// Test results specified in original ENS Proposal:
// https://github.com/ethereum/EIPs/issues/137

test('empty name', (t) => {
	t.plan(1)
	const input = ''
	const expected = '0x0000000000000000000000000000000000000000000000000000000000000000'
	const output = namehash.hash(input)
	t.equal(output, expected)
})

test('empty param', (t) => {
	t.plan(1)
	const expected = '0x0000000000000000000000000000000000000000000000000000000000000000'
	const output = namehash.hash('')
	t.equal(output, expected)
})

test('TLD eth', (t) => {
	t.plan(1)
	const input = 'eth'
	const expected = '0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae'
	const output = namehash.hash(input)
	t.equal(output, expected)
})
test('TLD neon', (t) => {
	t.plan(1)
	const input = 'neon'
	const expected = '0x534e499aa07054e03937905209ceabfecf5290265f1fc04430cea90ba2847648'
	const output = namehash.hash(input)
	t.equal(output, expected)
})
test('foo.eth', (t) => {
	t.plan(1)
	const input = 'foo.eth'
	const expected = '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f'
	const output = namehash.hash(input)
	t.equal(output, expected)
})

test('normalize ascii domain', (t) => {
	t.plan(1)
	const input = 'foo.eth' // latin chars only
	const expected = 'foo.eth'
	const output = namehash.normalize(input)
	t.equal(output, expected)
})


test('normalize international domain', (t) => {
	t.plan(1)
	const input = 'fоо.eth' // with cyrillic 'o'
	const expected = 'fоо.eth'
	const output = namehash.normalize(input)
	t.equal(output, expected)
})

test('normalize capitalized domain', (t) => {
	t.plan(1)
	const input = 'Foo.eth' // latin chars only
	const expected = 'foo.eth'
	const output = namehash.normalize(input)
	t.equal(output, expected)
})

test('normalize emoji domain', (t) => {
	t.plan(1)
	const input = '🦚.eth'
	const expected = '🦚.eth'
	const output = namehash.normalize(input)
	t.equal(output, expected)
})


test('addr.reverse', (t) => {
	t.plan(1)
	const input = 'neon'
	const output = namehash.hash(input)
	console.log('addr.reverse', output);
	t.equal(output, '')
})
