# Cleanlab — Supplement Store Frontend

React + Vite frontend for the Cleanlab gym supplement store demo.
Mock data + localStorage only — no backend yet.

## Run it

npm install
npm run dev

Then open the printed http://localhost:5173 link.

## What's inside

- Storefront: home, shop with filters, product detail, cart drawer, checkout
  with validation, order success.
- Admin: fake login (any email/password), dashboard, product list with
  publish toggle and a drag-and-drop image uploader, orders list.
- Data persists to localStorage under the key `cleanlab_v1`. Clear your
  browser storage to reset to the seed products.
- Light/dark theme toggle in the header, respects system preference by default.

## Folder structure

See FOLDER_STRUCTURE.md for the full layout and what each piece does.

## Next step: a real backend

Swap StoreContext's localStorage read/write for real API calls (Supabase is
a good fit) and the frontend components don't need to change — they only
talk to useStore() and useCart(), not to localStorage directly.
