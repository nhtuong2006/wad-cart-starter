import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// This test fails until you implement cartTotal. That is the point:
// run `npm test` first and see it red.
test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 467400)
})

// ---- Added by me: edge cases from the specification ----

const opts = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
const line = (price, qty) => ({ name: 'item', price, qty })

test('result is a number, not a string', () => {
  const total = cartTotal([line(180000, 2), line(45000, 1)], opts)
  assert.equal(typeof total, 'number')
})

test('empty cart returns 0 (no VAT, no shipping)', () => {
  assert.equal(cartTotal([], opts), 0)
})

test('subtotal just below the threshold (499999) pays shipping', () => {
  assert.equal(cartTotal([line(499999, 1)], opts), 569999)
})

test('subtotal exactly at the threshold (500000) ships free', () => {
  assert.equal(cartTotal([line(500000, 1)], opts), 540000)
})

test('result is rounded to a whole dong', () => {
  assert.equal(cartTotal([line(33333, 1)], opts), 66000)
})

test('negative price throws RangeError', () => {
  assert.throws(() => cartTotal([line(-1, 1)], opts), RangeError)
})

test('non-integer qty throws RangeError', () => {
  assert.throws(() => cartTotal([line(1000, 1.5)], opts), RangeError)
})

test('zero qty throws RangeError', () => {
  assert.throws(() => cartTotal([line(1000, 0)], opts), RangeError)
})

test('NaN qty throws RangeError', () => {
  assert.throws(() => cartTotal([line(1000, NaN)], opts), RangeError)
})