package com.nftcar.alyra.service.mapper;

import com.nftcar.alyra.domain.Part;
import com.nftcar.alyra.service.dto.PartDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Part} and its DTO {@link PartDTO}.
 */
@Mapper(componentModel = "spring", uses = { CarMapper.class })
public interface PartMapper extends EntityMapper<PartDTO, Part> {
    @Mapping(target = "car", source = "car", qualifiedByName = "id")
    PartDTO toDto(Part s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PartDTO toDtoId(Part part);
}
