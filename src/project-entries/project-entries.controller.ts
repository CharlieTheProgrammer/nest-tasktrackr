import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { CreateEntryDto } from 'src/entries/dto/create-entry.dto';
// import { UpdateEntryDto } from 'src/entries/dto/update-entry.dto';
import { EntriesService } from 'src/entries/entries.service';

@Controller('projects/:projectId/entries')
export class ProjectEntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  // @Post()
  // create(@Body() createProjectEntryDto: CreateEntryDto) {
    
  //   return this.entriesService.create(createProjectEntryDto);
  // }

  // This will be the only route because this is the only one that needs the project id
  @Get()
  findAll(@Param('projectId') projectId) {
    return this.entriesService.findAllByProjectId(projectId);
  }

  // Commenting these out for now because technically, although an entry belongs
  // to a project, I don't need the project id to update, get one, or delete an entry.
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.entriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectEntryDto: UpdateEntryDto) {
  //   return this.entriesService.update(+id, updateProjectEntryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.entriesService.remove(+id);
  // }
}
