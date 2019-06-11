export class PaginationObject {
  constructor(perPage = 5) {
    this.perPage = perPage
    this._offset = 0
  }

  get page() {
    return ~~(this._offset / this._perPage)
  }

  get perPage() {
    return this._perPage
  }

  get offset() {
    return this._offset
  }

  set perPage(perPage) {
    this._perPage = perPage
  }

  goToPage(page) {
    this._offset = this._perPage * page
  }

  filterResults(results) {
    return results.slice(this._offset, this._offset + this._perPage)
  }

  capOffset(total) {
    if (this._offset > total) {
      this._offset = total
    }
  }
}
