const CLAIMS = [
  { claim: 'A screenshot', stamp: 'Can be faked' },
  { claim: 'A page you linked last week', stamp: 'Can be edited since' },
  { claim: 'The date at the top of the post', stamp: 'Whatever the site says' },
]

/** Three claims in large type, each with a red rubber stamp. */
export function Why() {
  return (
    <section className="why" id="why">
      <div className="wrap">
        <span className="lab">Why a receipt</span>
        <h2 className="thin">Everything a reader is shown today is a claim.</h2>
        <ul className="claims">
          {CLAIMS.map(({ claim, stamp }) => (
            <li key={claim}>
              <span>{claim}</span>
              <span className="stamp">{stamp}</span>
            </li>
          ))}
        </ul>
        <p className="thin after">
          A receipt is not a claim. <em className="yes">The reader checks it.</em>
        </p>
      </div>
    </section>
  )
}
