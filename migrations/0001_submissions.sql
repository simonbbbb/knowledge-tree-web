-- CTA submissions: demo bookings, trial signups, sales inquiries
CREATE TABLE IF NOT EXISTS submissions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  kind        TEXT NOT NULL CHECK (kind IN ('demo', 'trial', 'sales')),
  name        TEXT,
  email       TEXT NOT NULL,
  company     TEXT,
  role        TEXT,
  team_size   TEXT,
  use_case    TEXT,
  message     TEXT,
  source_page TEXT,
  user_agent  TEXT,
  ip          TEXT,
  status      TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'spam')),
  notes       TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_submissions_kind       ON submissions(kind);
CREATE INDEX IF NOT EXISTS idx_submissions_status     ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_email      ON submissions(email);
