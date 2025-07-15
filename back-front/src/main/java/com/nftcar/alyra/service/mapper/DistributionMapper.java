package com.nftcar.alyra.service.mapper;

import com.nftcar.alyra.domain.Distribution;
import com.nftcar.alyra.service.dto.DistributionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Distribution} and its DTO {@link DistributionDTO}.
 */
@Mapper(componentModel = "spring", uses = { RevenueMapper.class, PartMapper.class })
public interface DistributionMapper extends EntityMapper<DistributionDTO, Distribution> {
    @Mapping(target = "revenue", source = "revenue", qualifiedByName = "id")
    @Mapping(target = "part", source = "part", qualifiedByName = "id")
    DistributionDTO toDto(Distribution s);
}
