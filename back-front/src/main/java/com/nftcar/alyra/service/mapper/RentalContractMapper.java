package com.nftcar.alyra.service.mapper;

import com.nftcar.alyra.domain.RentalContract;
import com.nftcar.alyra.service.dto.RentalContractDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link RentalContract} and its DTO {@link RentalContractDTO}.
 */
@Mapper(componentModel = "spring", uses = { VehicleMapper.class, UserExtendedMapper.class })
public interface RentalContractMapper extends EntityMapper<RentalContractDTO, RentalContract> {
    @Mapping(target = "vehicle", source = "vehicle", qualifiedByName = "id")
    @Mapping(target = "locataire", source = "locataire")
    @Mapping(target = "loueur", source = "loueur")
    RentalContractDTO toDto(RentalContract s);
}
