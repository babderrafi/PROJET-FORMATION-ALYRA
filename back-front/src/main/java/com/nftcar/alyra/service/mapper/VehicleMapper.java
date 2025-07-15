package com.nftcar.alyra.service.mapper;

import com.nftcar.alyra.domain.Vehicle;
import com.nftcar.alyra.service.dto.VehicleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Vehicle} and its DTO {@link VehicleDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserExtendedMapper.class })
public interface VehicleMapper extends EntityMapper<VehicleDTO, Vehicle> {
    @Mapping(target = "loueur", source = "loueur", qualifiedByName = "id")
    VehicleDTO toDto(Vehicle s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    VehicleDTO toDtoId(Vehicle vehicle);
}
