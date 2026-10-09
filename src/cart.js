/**
 * Compute the payable total of a shopping cart, in whole đồng.
 *
 * @param {{ name: string, price: number, qty: number }[]} items
 * @param {{ vatRate: number, freeShipFrom: number, shipFee: number }} options
 *   vatRate is a fraction (0.08 = 8%).
 * @returns {number} subtotal + VAT + shipping, rounded once to a whole đồng.
 * @throws {RangeError} if any price is negative/non-finite, or any qty is
 *   not a positive integer.
 */
export function cartTotal(items, options) {
  const { vatRate, freeShipFrom, shipFee } = options

  // Validate every line first, so bad input never gets a silent total.
  for (const { price, qty } of items) {
    if (!Number.isFinite(price) || price < 0) {
      throw new RangeError(`price must be a non-negative number, got ${price}`)
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new RangeError(`qty must be a positive integer, got ${qty}`)
    }
  }

  // Empty cart: no VAT, no shipping.
  if (items.length === 0) return 0

  const subtotal = items.reduce((sum, { price, qty }) => sum + price * qty, 0)
  const vat = subtotal * vatRate
  const shipping = subtotal >= freeShipFrom ? 0 : shipFee

  // Round once, at the end, and return a number (never toFixed's string).
  return Math.round(subtotal + vat + shipping)
}