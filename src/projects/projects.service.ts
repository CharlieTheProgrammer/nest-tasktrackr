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
      message: 'ok'
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

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
