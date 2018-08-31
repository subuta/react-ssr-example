import Router from 'koa-router'

import _ from 'lodash'
import path from 'path'
import fs from 'fs'

import {
  ROOT_DIR
} from '../config'

const router = new Router()

router.get('/hoge', async (ctx) => {
  ctx.body = 'hoge'
})

export default router