/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  // Rename icon to icon_svg in values table
  db.unsafeExec(`
    ALTER TABLE values RENAME COLUMN icon TO icon_svg;
  `);

  // Rename icon to icon_svg in process_steps table
  db.unsafeExec(`
    ALTER TABLE process_steps RENAME COLUMN icon TO icon_svg;
  `);

  // Rename icon to icon_svg in features table
  db.unsafeExec(`
    ALTER TABLE features RENAME COLUMN icon TO icon_svg;
  `);

  // Rename icon to icon_svg in employee_benefits table
  db.unsafeExec(`
    ALTER TABLE employee_benefits RENAME COLUMN icon TO icon_svg;
  `);

  // Rename icon to icon_svg in cta_cards table
  db.unsafeExec(`
    ALTER TABLE cta_cards RENAME COLUMN icon TO icon_svg;
  `);

  // Rename icon to icon_svg in contact_options table
  db.unsafeExec(`
    ALTER TABLE contact_options RENAME COLUMN icon TO icon_svg;
  `);

  // Rename icon to icon_svg in compliance_items table
  db.unsafeExec(`
    ALTER TABLE compliance_items RENAME COLUMN icon TO icon_svg;
  `);

  // Rename icon to icon_svg in category table
  db.unsafeExec(`
    ALTER TABLE category RENAME COLUMN icon TO icon_svg;
  `);
}, (db) => {
  // Rollback: rename back to icon
  db.unsafeExec(`
    ALTER TABLE values RENAME COLUMN icon_svg TO icon;
  `);

  db.unsafeExec(`
    ALTER TABLE process_steps RENAME COLUMN icon_svg TO icon;
  `);

  db.unsafeExec(`
    ALTER TABLE features RENAME COLUMN icon_svg TO icon;
  `);

  db.unsafeExec(`
    ALTER TABLE employee_benefits RENAME COLUMN icon_svg TO icon;
  `);

  db.unsafeExec(`
    ALTER TABLE cta_cards RENAME COLUMN icon_svg TO icon;
  `);

  db.unsafeExec(`
    ALTER TABLE contact_options RENAME COLUMN icon_svg TO icon;
  `);

  db.unsafeExec(`
    ALTER TABLE compliance_items RENAME COLUMN icon_svg TO icon;
  `);

  db.unsafeExec(`
    ALTER TABLE category RENAME COLUMN icon_svg TO icon;
  `);
});
