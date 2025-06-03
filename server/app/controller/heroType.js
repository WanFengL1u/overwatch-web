'use strict';
const Controller = require('egg').Controller;

class HeroTypeController extends Controller {
  async list() {
    const { ctx } = this;
    try {
      const data = await ctx.service.heroType.list();
      ctx.body = {
        code: 200,
        message: '成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroTypeController.list error: ${err}`);
      ctx.body = {
        code: 500,
        message: '服务器内部错误',
      };
    }
  }

  async detail() {
    const { ctx } = this;
    const { id } = ctx.query;
    try {
      const data = await ctx.service.heroType.detail(id);
      ctx.body = {
        code: 200,
        message: '成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroTypeController.detail error: ${err}`);
      ctx.body = {
        code: 500,
        message: '服务器内部错误',
      };
    }
  }

  async add() {
    const { ctx } = this;
    const addReq = ctx.request.body;
    try {
      const data = await ctx.service.heroType.add(addReq);
      ctx.body = {
        code: 200,
        message: '成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroTypeController.add error: ${err}`);
      ctx.body = {
        code: 500,
        message: '服务器内部错误',
      };
    }
  }

  async edit() {
    const { ctx } = this;
    const editReq = ctx.request.body;
    try {
      const data = await ctx.service.heroType.edit(editReq);
      ctx.body = {
        code: 200,
        message: '成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroTypeController.edit error: ${err}`);
      ctx.body = {
        code: 500,
        message: '服务器内部错误',
      };
    }
  }

  async del() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const data = await ctx.service.heroType.del(id);
      ctx.body = {
        code: 200,
        message: '成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroTypeController.del error: ${err}`);
      ctx.body = {
        code: 500,
        message: '服务器内部错误',
      };
    }
  }
}

module.exports = HeroTypeController;
