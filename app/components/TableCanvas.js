import m from 'mithril'

export default {
  text() {
    return "vciso"
  },

  view() {
    return (
      <main>
        <h1>{this.text()}</h1>
      </main>
    )
  }
}
