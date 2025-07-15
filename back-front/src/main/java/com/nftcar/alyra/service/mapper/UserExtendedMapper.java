package com.nftcar.alyra.service.mapper;

import com.nftcar.alyra.domain.UserExtended;
import com.nftcar.alyra.service.dto.UserExtendedDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserExtended} and its DTO {@link UserExtendedDTO}.
 */
@Mapper(componentModel = "spring")
public interface UserExtendedMapper extends EntityMapper<UserExtendedDTO, UserExtended> {

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserExtendedDTO toDtoId(UserExtended userExtended);

}
