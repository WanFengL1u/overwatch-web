'use strict';
const Controller = require('egg').Controller;

class HeroController extends Controller {
  async list() {
    const { ctx } = this;
    const { page = 1, pageSize = 10,hero_type } = ctx.query;
    
    try {
      // 参数校验
      const params = {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        hero_type: hero_type ? parseInt(hero_type) : undefined
      };
      
      if (isNaN(params.page) || isNaN(params.pageSize)) {
        ctx.body = {
          code: 400,
          message: '参数错误',
        };
        return;
      }

      const data = await ctx.service.hero.list(params.page, params.pageSize,params.hero_type);
      ctx.body = {
        code: 200,
        message: '成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroController.list error: ${err}`);
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
      if (!id) {
        ctx.body = {
          code: 400,
          message: 'ID不能为空',
        };
        return;
      }

      const data = await ctx.service.hero.detail(id);
      if (!data) {
        ctx.body = {
          code: 404,
          message: '英雄不存在',
        };
        return;
      }

      ctx.body = {
        code: 200,
        message: '成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroController.detail error: ${err}`);
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
      // 参数校验
      if (!addReq.name || !addReq.hero_type) {
        ctx.body = {
          code: 400,
          message: '名称和英雄类型不能为空',
        };
        return;
      }

      const data = await ctx.service.hero.add(addReq);
      ctx.body = {
        code: 200,
        message: '添加成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroController.add error: ${err}`);
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
      // 参数校验
      if (!editReq.id) {
        ctx.body = {
          code: 400,
          message: 'ID不能为空',
        };
        return;
      }

      const data = await ctx.service.hero.edit(editReq);
      if (!data) {
        ctx.body = {
          code: 404,
          message: '英雄不存在',
        };
        return;
      }

      ctx.body = {
        code: 200,
        message: '更新成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroController.edit error: ${err}`);
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
      if (!id) {
        ctx.body = {
          code: 400,
          message: 'ID不能为空',
        };
        return;
      }

      const data = await ctx.service.hero.del(id);
      if (!data) {
        ctx.body = {
          code: 404,
          message: '英雄不存在',
        };
        return;
      }

      ctx.body = {
        code: 200,
        message: '删除成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroController.del error: ${err}`);
      ctx.body = {
        code: 500,
        message: '服务器内部错误',
      };
    }
  }

  async search() {
    const { ctx } = this;
    const { page = 1, pageSize = 10, ...params } = ctx.query;
    
    try {
      const data = await ctx.service.hero.search(params, parseInt(page), parseInt(pageSize));
      ctx.body = {
        code: 200,
        message: '成功',
        data,
      };
    } catch (err) {
      ctx.logger.error(`HeroController.search error: ${err}`);
      ctx.body = {
        code: 500,
        message: '服务器内部错误',
      };
    }
  }
}

module.exports = HeroController;