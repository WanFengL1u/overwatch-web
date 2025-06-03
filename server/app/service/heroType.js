'use strict';
const Service = require('egg').Service;

class HeroTypeService extends Service {
  async list() {
    const { ctx } = this;
    return await ctx.model.HeroType.findAll({
      where: { isDelete: 0 },
    });
  }

  async detail(id) {
    const { ctx } = this;
    return await ctx.model.HeroType.findOne({
      where: { id, isDelete: 0 },
    });
  }

  async add(addReq) {
    const { ctx } = this;
    const now = Math.floor(Date.now() / 1000);
    return await ctx.model.HeroType.create({
      ...addReq,
      createTime: now,
      updateTime: now,
    });
  }

  async edit(editReq) {
    const { ctx } = this;
    const { id, ...updateData } = editReq;
    const heroType = await ctx.model.HeroType.findOne({ 
      where: { id, isDelete: 0 } 
    });
    
    if (!heroType) {
      throw new Error('英雄类型不存在');
    }
    
    updateData.updateTime = Math.floor(Date.now() / 1000);
    return await heroType.update(updateData);
  }

  async del(id) {
    const { ctx } = this;
    const heroType = await ctx.model.HeroType.findOne({ 
      where: { id, isDelete: 0 } 
    });
    
    if (!heroType) {
      throw new Error('英雄类型不存在');
    }
    
    return await heroType.update({
      isDelete: 1,
      deleteTime: Math.floor(Date.now() / 1000),
    });
  }
}

module.exports = HeroTypeService;
