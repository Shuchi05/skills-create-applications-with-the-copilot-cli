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

// New helper functions requested
function modulo(a, b) {
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot take square root of a negative number');
  }
  return Math.sqrt(n);
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
    case 'mod':
    case '%':
      return modulo(a, b);
    case 'pow':
    case '^':
      return power(a, b);
    case 'sqrt':
      // square root only uses the first operand (a)
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

// Export functions for testing and only run CLI when invoked directly
module.exports = {
  showUsage,
  parseNumber,
  calculate,
  modulo,
  power,
  squareRoot,
};

if (require.main === module) {
  const args = process.argv.slice(2);
  const op = args[0];

  // Allow sqrt to accept a single operand, others expect two
  if (!op) {
    showUsage();
    process.exit(1);
  }

  if (op === 'sqrt') {
    if (args.length !== 2) {
      showUsage();
      process.exit(1);
    }
    const s1 = args[1];
    const n1 = parseNumber(s1);
    if (n1 === null) {
      console.error('Error: operand must be a valid number.');
      showUsage();
      process.exit(1);
    }

    try {
      const result = calculate(op, n1);
      console.log(result);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  } else {
    if (args.length !== 3) {
      showUsage();
      process.exit(1);
    }

    const [op2, s1, s2] = args;
    const n1 = parseNumber(s1);
    const n2 = parseNumber(s2);

    if (n1 === null || n2 === null) {
      console.error('Error: operands must be valid numbers.');
      showUsage();
      process.exit(1);
    }

    try {
      const result = calculate(op2, n1, n2);
      // Print result to stdout
      console.log(result);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  }
}
