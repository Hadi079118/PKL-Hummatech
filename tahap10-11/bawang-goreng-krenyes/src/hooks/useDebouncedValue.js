/**
 * ============================================================
 * useDebouncedValue — Hook Optimasi Performa (Debounce)
 * ============================================================
 * Menunda pembaruan sebuah nilai selama `delay` milidetik.
 * Dipakai untuk input pencarian: request API hanya dijalankan
 * setelah user BERHENTI mengetik (350ms), bukan per ketukan huruf.
 *
 * Manfaat:
 *  - Mengurangi jumlah request ke server secara drastis.
 *  - Menghindari render/fetch berlebihan saat mengetik cepat.
 *
 * Contoh:
 *   const debouncedQuery = useDebouncedValue(query, 350);
 * ============================================================
 */
import { useEffect, useState } from 'react';

export function useDebouncedValue(value, delay = 350) {
  // Nilai yang "sebenarnya" dipakai oleh logika (tertunda)
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Setiap kali `value` berubah, timer lama di-clear dan dibuat ulang.
    // Karena itu nilai hanya ter-update jika input TIDAK berubah
    // selama `delay` milisecond berturut-turut.
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup: batalkan timer saat komponen unmount atau value berubah
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
