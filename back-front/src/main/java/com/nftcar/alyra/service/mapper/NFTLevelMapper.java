package com.nftcar.alyra.service.mapper;

import com.nftcar.alyra.domain.NFTLevel;
import com.nftcar.alyra.service.dto.NFTLevelDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link NFTLevel} and its DTO {@link NFTLevelDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface NFTLevelMapper extends EntityMapper<NFTLevelDTO, NFTLevel> {}
