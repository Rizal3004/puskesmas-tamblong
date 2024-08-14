/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/admin': RouteRecordInfo<'/admin', '/admin', Record<never, never>, Record<never, never>>,
    '/admin/booking/': RouteRecordInfo<'/admin/booking/', '/admin/booking', Record<never, never>, Record<never, never>>,
    '/admin/booking/[id]/': RouteRecordInfo<'/admin/booking/[id]/', '/admin/booking/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/admin/dokter/': RouteRecordInfo<'/admin/dokter/', '/admin/dokter', Record<never, never>, Record<never, never>>,
    '/admin/dokter/[id]/update': RouteRecordInfo<'/admin/dokter/[id]/update', '/admin/dokter/:id/update', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/admin/dokter/create': RouteRecordInfo<'/admin/dokter/create', '/admin/dokter/create', Record<never, never>, Record<never, never>>,
    '/admin/pasien/': RouteRecordInfo<'/admin/pasien/', '/admin/pasien', Record<never, never>, Record<never, never>>,
    '/admin/pasien/[id]/update': RouteRecordInfo<'/admin/pasien/[id]/update', '/admin/pasien/:id/update', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/admin/riwayat/': RouteRecordInfo<'/admin/riwayat/', '/admin/riwayat', Record<never, never>, Record<never, never>>,
    '/auth/login': RouteRecordInfo<'/auth/login', '/auth/login', Record<never, never>, Record<never, never>>,
    '/auth/register': RouteRecordInfo<'/auth/register', '/auth/register', Record<never, never>, Record<never, never>>,
    '/jadwal-pengobatan/': RouteRecordInfo<'/jadwal-pengobatan/', '/jadwal-pengobatan', Record<never, never>, Record<never, never>>,
    '/profile/': RouteRecordInfo<'/profile/', '/profile', Record<never, never>, Record<never, never>>,
    '/profile/riwayat': RouteRecordInfo<'/profile/riwayat', '/profile/riwayat', Record<never, never>, Record<never, never>>,
  }
}
