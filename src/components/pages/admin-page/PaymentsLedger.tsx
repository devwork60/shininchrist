import type { LedgerRow } from "@/lib/payments/ledger";

const money = (value: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);

const when = (value: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(value);

/** Every recent payment in one table: uniform, donations and Library contributions, card and bank transfer. */
const PaymentsLedger = ({ rows }: { rows: LedgerRow[] }) => (
  <section>
    <h2 className="mb-3 font-heading text-xl font-semibold text-primary-green">
      All payments and donations (latest {rows.length})
    </h2>
    {rows.length === 0 ? (
      <p className="text-sm text-text-grey">No payments yet.</p>
    ) : (
      <div className="overflow-x-auto rounded-xl border border-primary-green/10 bg-white-color">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-cream text-xs uppercase tracking-wide text-text-grey">
            <tr>
              {["Date", "For", "From", "Method", "Amount", "Status"].map((h) => (
                <th key={h} className="px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-primary-green/10 align-top">
                <td className="whitespace-nowrap px-3 py-2">{when(row.at)}</td>
                <td className="px-3 py-2">{row.kind}</td>
                <td className="px-3 py-2">
                  {row.payer || "—"}
                  <span className="block text-xs text-text-grey">{row.email}</span>
                </td>
                <td className="px-3 py-2">{row.method}</td>
                <td className="whitespace-nowrap px-3 py-2 font-semibold">{money(row.amount, row.currency)}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${row.status === "Paid" ? "bg-primary-green text-white-color" : "bg-primary-gold/20 text-card-heading"}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

export default PaymentsLedger;
