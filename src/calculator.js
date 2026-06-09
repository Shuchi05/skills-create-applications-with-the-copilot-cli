#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supports: addition, subtraction, multiplication, division
 * Operations:
 *  - add / +    : addition
 *  - sub / -    : subtraction
 *  - mul / *    : multiplication
 *  - div / /    : division
 *
 * Usage:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js + 2 3
 */

function showUsage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.error('Operations: add (+), sub (-), mul (*), div (/)');
}

function parseNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function calculate(op, a, b) {
  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'sub':
    case '-':
      return a - b;
    case 'mul':
    case '*':
      return a * b;
    case 'div':
    case '/':
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

// CLI entry
const args = process.argv.slice(2);
if (args.length !== 3) {
  showUsage();
  process.exit(1);
}

const [op, s1, s2] = args;
const n1 = parseNumber(s1);
const n2 = parseNumber(s2);

if (n1 === null || n2 === null) {
  console.error('Error: operands must be valid numbers.');
  showUsage();
  process.exit(1);
}

try {
  const result = calculate(op, n1, n2);
  // Print result to stdout
  console.log(result);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
