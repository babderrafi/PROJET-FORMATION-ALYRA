package com.nftcar.alyra.service.dto;

import com.nftcar.alyra.domain.enumeration.UserRole;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.nftcar.alyra.domain.UserExtended} entity.
 */
public class UserExtendedDTO implements Serializable {

    private Long id;

    @NotNull
    private UserRole role;

    @NotNull
    private String ethereumAddress;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getEthereumAddress() {
        return ethereumAddress;
    }

    public void setEthereumAddress(String ethereumAddress) {
        this.ethereumAddress = ethereumAddress;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserExtendedDTO)) {
            return false;
        }

        UserExtendedDTO userExtendedDTO = (UserExtendedDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, userExtendedDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserExtendedDTO{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            ", ethereumAddress='" + getEthereumAddress() + "'" +
            "}";
    }
}
