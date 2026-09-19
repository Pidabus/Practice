/**
 * ============================================================================
 * DRILL 1: TEXT OBJECTS (inside / around) <-- Completed -->
 * ============================================================================
 * Goals:
 * 1. Place cursor inside the strings below -> run `ci"` to change inside quotes.
 * 2. Place cursor inside parentheses -> run `ci(` or `di(`.
 * 3. Place cursor inside curly braces -> run `ci{` or `va{`.
 * 4. Place cursor inside square brackets -> run `ca[` to delete including brackets.
 */

const userConfig = {
  apiEndpoint: "https://api.internal-v2.service.cloud/v1/telemetry",
  fallbackUrl: "https://backup.internal-v2.service.cloud/v1/telemetry",
  timeoutDuration: 5000,
  retryLimits: [3, 5, 10, 20],
  headers: {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    clientVersion: "3.14.159-alpha-hotfix",
    acceptType: "application/json; charset=utf-8",
  },
};

function sendTelemetry(payload, options = { verbose: false, compress: true }) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid telemetry payload provided: must be an object");
  }
  return { status: 200, delivered: true, timestamp: Date.now() };
}

/**
 * ============================================================================
 * DRILL 2: HORIZONTAL MOTIONS (`f`, `t`, `F`, `T`, `;`, `,`)
 * ============================================================================
 * Goals:
 * 1. From the start of line 38, jump directly to the '=' using `f=`
 * 2. Jump to the next '=' using `;`
 * 3. Delete up to the semicolon using `dt;`
 * 4. Change everything up to the next opening parenthesis using `ct(`
 */

const calculateDiscount = (price, rate, minTotal, isVip, couponCode) => {
  let discountAmount = price * rate;
  let finalPrice = price - discountAmount;
  let applies = isVip && finalPrice >= minTotal && couponCode !== "EXPIRED";
  return applies ? finalPrice : price;
};

/**
 * ============================================================================
 * DRILL 3: VISUAL BLOCK EDITING (`Ctrl-v`)
 * ============================================================================
 * Goals:
 * 1. Add `export ` in front of every const:
 *    - Cursor on `const STATUS_IDLE`
 *    - `Ctrl-v`, down 4 times (`4j`), `I`, type `export `, press `Esc`.
 * 2. Change all numbers to string values or comments:
 *    - Block select the numbers, `c`, type your edit, press `Esc`.
 */

const STATUS_IDLE = 100;
const STATUS_PENDING = 200;
const STATUS_RUNNING = 300;
const STATUS_COMPLETED = 400;
const STATUS_FAILED = 500;

/**
 * ============================================================================
 * DRILL 4: MATCHING PAIRS AND BLOCKS (`%`, `[{`, `]}`)
 * ============================================================================
 * Goals:
 * 1. Put cursor on the opening `{` of `processOrder` and hit `%` to find end.
 * 2. Jump between `if/else` boundaries.
 * 3. Delete the entire inner `try` block using `da{`.
 */

function processOrder(orderId, inventoryMap, auditLog) {
  if (!orderId) return null;

  try {
    const item = inventoryMap.get(orderId);
    if (item) {
      if (item.stock > 0) {
        item.stock -= 1;
        auditLog.push({
          action: "DEDUCT",
          id: orderId,
          meta: { previousStock: item.stock + 1, remaining: item.stock },
        });
        return { success: true, count: item.stock };
      } else {
        return { success: false, reason: "OUT_OF_STOCK" };
      }
    }
  } catch (err) {
    console.error("Critical database error occurred during dispatch", err);
    return { success: false, error: err.message };
  }

  return { success: false, reason: "NOT_FOUND" };
}

/**
 * ============================================================================
 * DRILL 5: THE DOT OPERATOR (`.`) & `cgn` REPEAT SEARCH
 * ============================================================================
 * Goals:
 * 1. Place cursor on `var`, run `cw`, type `const`, hit `Esc`.
 * 2. Jump to next lines with `j` and repeat with `.`.
 * 3. Or use `*` on `tempData` to highlight it, run `ciw` to rename it,
 *    then use `n` and `.` (or `cgn`) to replace occurrences.
 */

var tempDataA = fetchFromCache("alpha");
var tempDataB = fetchFromCache("beta");
var tempDataC = fetchFromCache("gamma");
var tempDataD = fetchFromCache("delta");

function normalizeRecords(tempDataA, tempDataB) {
  const combined = [];
  if (tempDataA) combined.push(tempDataA);
  if (tempDataB) combined.push(tempDataB);
  return combined;
}

/**
 * ============================================================================
 * DRILL 6: LINE COMBINATIONS, JOINING, & REGEX (`J`, `dd`, `p`, `:%s`)
 * ============================================================================
 * Goals:
 * 1. Put cursor on `first_name:` and join the lines with `J` (Shift-J).
 * 2. Swap line order using `dd` then `p`.
 * 3. Substitute snake_case to camelCase using `:%s/user_/customer_/g`.
 */

const user_profile_schema = {
  user_id: 9942,
  user_first_name: "Bruce",
  user_last_name: "Wayne",
  user_email: "bruce@wayne-enterprises.corp",
  user_is_active: true,
};