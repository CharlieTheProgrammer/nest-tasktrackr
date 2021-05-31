import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from 'src/core/entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project)
    private projectModel: typeof Project,
  ) {}

  async create(@Body() createProjectDto: CreateProjectDto) {
    console.log(createProjectDto);
    const project = await Project.create(createProjectDto);
    console.log(project.toJSON());
    return {
      message: 'ok',
      project
    };
  }

  async findAll() {
    return await Project.findAll();
  }

  async findOne(id: number) {
    return await Project.findByPk(id);
  }

  async update(id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return await Project.update(updateProjectDto, {
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    // Will need to add user Id here somewhere to make sure user
    // can only delete their projects
    console.log(id);
    return await Project.destroy({
      where: {
        id
      }
    });
  }
}
