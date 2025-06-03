'use strict';
const Service = require('egg').Service;

class HeroService extends Service {
  async list(page = 1, pageSize = 10,hero_type) {
    const { ctx } = this;
    const where = { is_delete: 0 };
  
    // Add hero_type condition if provided
    if (hero_type !== undefined && hero_type !== null && hero_type !== '') {
      where.hero_type = hero_type;
    }
    const { count, rows } = await ctx.model.Hero.findAndCountAll({
      where: where,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'ASC']], // 默认按ID升序
    });

    return {
      total: count,
      list: rows,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  }

  async detail(id) {
    const { ctx } = this;
    return await ctx.model.Hero.findOne({
      where: { id, is_delete: 0 },
    });
  }

  async add(addReq) {
    const { ctx } = this;
    const now = Math.floor(Date.now() / 1000);
    return await ctx.model.Hero.create({
      ...addReq,
      create_time: now,
      update_time: now,
    });
  }

  async edit(editReq) {
    const { ctx } = this;
    const { id, ...updateData } = editReq;
    const hero = await ctx.model.Hero.findOne({ 
      where: { id, is_delete: 0 } 
    });
    
    if (!hero) {
      ctx.throw(404, '英雄不存在');
    }
    
    updateData.update_time = Math.floor(Date.now() / 1000);
    return await hero.update(updateData);
  }

  async del(id) {
    const { ctx } = this;
    const hero = await ctx.model.Hero.findOne({ 
      where: { id, is_delete: 0 } 
    });
    
    if (!hero) {
      ctx.throw(404, '英雄不存在');
    }
    
    return await hero.update({
      is_delete: 1,
      delete_time: Math.floor(Date.now() / 1000),
    });
  }

  // 高级查询（带条件分页）
  async search(params, page = 1, pageSize = 10) {
    const { ctx } = this;
    const where = { is_delete: 0 };
    
    // 构建查询条件
    if (params.name) {
      where.name = { [ctx.Op.like]: `%${params.name}%` };
    }
    if (params.hero_type) {
      where.hero_type = params.hero_type;
    }
    // 可以添加更多条件...

    const { count, rows } = await ctx.model.Hero.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'ASC']], // 可以改成其他排序字段
    });

    return {
      total: count,
      list: rows,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  }
}

module.exports = HeroService;