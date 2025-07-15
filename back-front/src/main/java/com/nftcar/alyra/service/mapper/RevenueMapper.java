package com.nftcar.alyra.service.mapper;

import com.nftcar.alyra.domain.Revenue;
import com.nftcar.alyra.service.dto.RevenueDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Revenue} and its DTO {@link RevenueDTO}.
 */
@Mapper(componentModel = "spring", uses = { CarMapper.class })
public interface RevenueMapper extends EntityMapper<RevenueDTO, Revenue> {
    @Mapping(target = "car", source = "car", qualifiedByName = "id")
    RevenueDTO toDto(Revenue s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RevenueDTO toDtoId(Revenue revenue);
}
