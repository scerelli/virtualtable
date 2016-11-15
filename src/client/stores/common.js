import { extendObservable } from 'mobx'

/**
 * @class Common
 */
export default class Common {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            title: 'virtualtable',
            statusCode: 200,
            hostname: 'localhost'
        }, state)
    }

    setTitle(newTitle) {
        this.title = newTitle
    }
}
