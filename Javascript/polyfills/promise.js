/*

  - when we resolve a promise the state changes from
   PENDING -> FULFILLED
   
  - when we reject a promise the state changes from
    PENDING -> REJECTED


  .then(resolutionHandler)
  .then(resolutionHandler, rejectionHandler)

*/

const STATES = {
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected"
};

class CustomPromise {
    #value = void 0;
    #state = STATES.PENDING;

    #resolutionHandlers = [];  // Stores .then success callbacks
    #rejectionHandlers = [];   // Stores .then/catch failure callbacks

    constructor(executorFunction) {
        // bind the internal resolve/reject
        this.resolve = this.#_resolve.bind(this);
        this.reject = this.#_reject.bind(this);

        // safely execute the executorFunction
        try {
            executorFunction(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    // called when user calls resolve() inside the executor
    #_resolve(value) {
        queueMicrotask(() => {
            if (this.#state !== STATES.PENDING) return;

            this.#state = STATES.FULFILLED;
            this.#value = value;

            this.#runResolutionHandlers();
        });
    }

    // called when user calls reject() inside the executor
    #_reject(value) {
        queueMicrotask(() => {
            if (this.#state !== STATES.PENDING) return;

            this.#state = STATES.REJECTED;
            this.#value = value;

            this.#runRejectionHandlers();
        });
    }

    // run all success handlers (if any)
    #runResolutionHandlers() {
        this.#resolutionHandlers.forEach(handler => handler(this.#value));
        this.#clearHandlers();
    }

    // run all error handlers (if any)
    #runRejectionHandlers() {
        this.#rejectionHandlers.forEach(handler => handler(this.#value));
        this.#clearHandlers();
    }

    // clear arrays after execution to avoid memory leaks
    #clearHandlers() {
        this.#resolutionHandlers = [];
        this.#rejectionHandlers = [];
    }

    /**
     * Allows chaining via .then(successCallback, failureCallback)
     */
    then(resolutionHandler, rejectionHandler) {
        return new CustomPromise((resolve, reject) => {
            const wrappedResolutionHandler = result => {
                try {
                    // if no handler provided, pass value forward
                    if (!resolutionHandler) return resolve(result);

                    const returned = resolutionHandler(result);

                    // if handler returns a promise, wait for it
                    returned instanceof CustomPromise
                        ? returned.then(resolve, reject)
                        : resolve(returned);
                } catch (err) {
                    reject(err);
                }
            };

            const wrappedRejectionHandler = error => {
                try {
                    // if no error handler, just reject
                    if (!rejectionHandler) return reject(error);

                    const returned = rejectionHandler(error);

                    // if returned is a promise, wait for it
                    returned instanceof CustomPromise
                        ? returned.then(resolve, reject)
                        : resolve(returned);  // resolve, because error is handled
                } catch (err) {
                    reject(err);
                }
            };

            // if already settled, execute handlers immediately
            if (this.#state === STATES.FULFILLED) {
                queueMicrotask(() => wrappedResolutionHandler(this.#value));
            } else if (this.#state === STATES.REJECTED) {
                queueMicrotask(() => wrappedRejectionHandler(this.#value));
            } else {
                // if still pending, push handlers to queues
                this.#resolutionHandlers.push(wrappedResolutionHandler);
                this.#rejectionHandlers.push(wrappedRejectionHandler);
            }
        });
    }

    /**
     * Catch errors — syntactic sugar over then(null, errorHandler)
     */
    catch(rejectionHandler) {
        return this.then(null, rejectionHandler);
    }

    /**
     * finally — called on both resolve or reject, doesn't change the value
     */
    finally(callback) {
        return this.then(
            value => CustomPromise.resolve(callback()).then(() => value),
            error => CustomPromise.resolve(callback()).then(() => { throw error; })
        );
    }

    /**
     * Static helper to create a resolved promise
     */
    static resolve(value) {
        return new CustomPromise(resolve => resolve(value));
    }

    /**
     * Static helper to create a rejected promise
     */
    static reject(value) {
        return new CustomPromise((_, reject) => reject(value));
    }
}


new CustomPromise((resolve, reject) => {
    resolve("✅ Promise worked");
})
    .then(val => {
        console.log("Resolved with:", val);
        return "✅ Next in chain";
    })
    .then(val => console.log(val))
    .catch(err => console.log("❌ Error:", err))
    .finally(() => console.log("🧹 Cleanup"));
