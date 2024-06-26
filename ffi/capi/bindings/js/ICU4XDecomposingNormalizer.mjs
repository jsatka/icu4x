import wasm from "./diplomat-wasm.mjs"
import * as diplomatRuntime from "./diplomat-runtime.mjs"
import { ICU4XDataError_js_to_rust, ICU4XDataError_rust_to_js } from "./ICU4XDataError.mjs"

const ICU4XDecomposingNormalizer_box_destroy_registry = new FinalizationRegistry(underlying => {
  wasm.ICU4XDecomposingNormalizer_destroy(underlying);
});

export class ICU4XDecomposingNormalizer {
  #lifetimeEdges = [];
  constructor(underlying, owned, edges) {
    this.underlying = underlying;
    this.#lifetimeEdges.push(...edges);
    if (owned) {
      ICU4XDecomposingNormalizer_box_destroy_registry.register(this, underlying);
    }
  }

  static create_nfd(arg_provider) {
    return (() => {
      const diplomat_receive_buffer = wasm.diplomat_alloc(5, 4);
      wasm.ICU4XDecomposingNormalizer_create_nfd(diplomat_receive_buffer, arg_provider.underlying);
      const is_ok = diplomatRuntime.resultFlag(wasm, diplomat_receive_buffer, 4);
      if (is_ok) {
        const ok_value = new ICU4XDecomposingNormalizer(diplomatRuntime.ptrRead(wasm, diplomat_receive_buffer), true, []);
        wasm.diplomat_free(diplomat_receive_buffer, 5, 4);
        return ok_value;
      } else {
        const throw_value = ICU4XDataError_rust_to_js[diplomatRuntime.enumDiscriminant(wasm, diplomat_receive_buffer)];
        wasm.diplomat_free(diplomat_receive_buffer, 5, 4);
        throw new diplomatRuntime.FFIError(throw_value);
      }
    })();
  }

  static create_nfkd(arg_provider) {
    return (() => {
      const diplomat_receive_buffer = wasm.diplomat_alloc(5, 4);
      wasm.ICU4XDecomposingNormalizer_create_nfkd(diplomat_receive_buffer, arg_provider.underlying);
      const is_ok = diplomatRuntime.resultFlag(wasm, diplomat_receive_buffer, 4);
      if (is_ok) {
        const ok_value = new ICU4XDecomposingNormalizer(diplomatRuntime.ptrRead(wasm, diplomat_receive_buffer), true, []);
        wasm.diplomat_free(diplomat_receive_buffer, 5, 4);
        return ok_value;
      } else {
        const throw_value = ICU4XDataError_rust_to_js[diplomatRuntime.enumDiscriminant(wasm, diplomat_receive_buffer)];
        wasm.diplomat_free(diplomat_receive_buffer, 5, 4);
        throw new diplomatRuntime.FFIError(throw_value);
      }
    })();
  }

  normalize(arg_s) {
    const buf_arg_s = diplomatRuntime.DiplomatBuf.str8(wasm, arg_s);
    const diplomat_out = diplomatRuntime.withDiplomatWrite(wasm, (write) => {
      return wasm.ICU4XDecomposingNormalizer_normalize(this.underlying, buf_arg_s.ptr, buf_arg_s.size, write);
    });
    buf_arg_s.free();
    return diplomat_out;
  }

  is_normalized(arg_s) {
    const buf_arg_s = diplomatRuntime.DiplomatBuf.str8(wasm, arg_s);
    const diplomat_out = wasm.ICU4XDecomposingNormalizer_is_normalized(this.underlying, buf_arg_s.ptr, buf_arg_s.size);
    buf_arg_s.free();
    return diplomat_out;
  }
}
