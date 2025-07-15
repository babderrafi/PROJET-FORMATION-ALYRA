package com.nftcar.alyra.service.mapper;

import com.nftcar.alyra.domain.FeePool;
import com.nftcar.alyra.service.dto.FeePoolDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link FeePool} and its DTO {@link FeePoolDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FeePoolMapper extends EntityMapper<FeePoolDTO, FeePool> {}
