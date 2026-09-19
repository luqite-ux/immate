import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('global events route and navigation are part of the public site', async () => {
  assert.ok(existsSync('app/events/page.tsx'))
  const site = await read('lib/site.ts')
  const sitemap = await read('app/sitemap.ts')
  assert.match(site, /Events[\s\S]*\/events/)
  assert.match(sitemap, /\/events/)
})

test('event registry covers every supplied exhibition group and all supplied photos', async () => {
  const events = await read('lib/events.ts')
  for (const event of [
    'Shenzhen Hi-Tech Fair',
    'Hong Kong Electronics Fair',
    'China-Eurasia Expo',
    'World Artificial Intelligence Conference',
    'China \(Shanghai\) International Technology Fair',
    'Harbin International Economic and Trade Fair',
    'Shenzhen AI & IoT Exhibition',
  ]) assert.match(events, new RegExp(event))

  const imageReferences = events.match(/\/images\/events\/[a-z0-9-]+\.jpg/g) ?? []
  assert.equal(new Set(imageReferences).size, 29)
  for (const image of new Set(imageReferences)) assert.ok(existsSync(`public${image}`), image)

  const videoReferences = events.match(/\/videos\/events\/[a-z0-9-]+\.mp4/g) ?? []
  assert.equal(new Set(videoReferences).size, 7)
  for (const video of new Set(videoReferences)) assert.ok(existsSync(`public${video}`), video)
})

test('homepage carries the expanded company narrative and safe facts', async () => {
  const home = await read('app/page.tsx')
  for (const fact of [
    '21-person team',
    '80% focused on R&D',
    '1.6 million connected devices',
    'APP SDK',
    'Device SDK',
    'Web SDK',
    'Global exhibitions',
  ]) assert.match(home, new RegExp(fact, 'i'))
  assert.doesNotMatch(home, /130 countries|150 countries|95% global/i)
})

test('about page no longer publishes conflicting country-count claims', async () => {
  const about = await read('app/about/page.tsx')
  assert.doesNotMatch(about, /130 countries|150 countries|95% global/i)
  assert.match(about, /1\.6 million connected devices/i)
  assert.match(about, /21-person team/i)
})

test('applications page uses four supplied PDF-derived scenario visuals', async () => {
  const applications = await read('app/applications/page.tsx')
  for (const asset of [
    'taxi-translator.jpg',
    'restaurant-translator.jpg',
    'lobby-translator.jpg',
    'conference-translator.jpg',
  ]) {
    assert.match(applications, new RegExp(asset))
    assert.ok(existsSync(`public/images/applications/${asset}`))
  }
})
