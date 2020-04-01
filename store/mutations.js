export default {
  toggle (state) {
    if (state.lang === 'de') {
      state.lang = 'en'
      return
    }
    state.lang = 'de'
  }
}
