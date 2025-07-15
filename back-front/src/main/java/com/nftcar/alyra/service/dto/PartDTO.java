package com.nftcar.alyra.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.nftcar.alyra.domain.Part} entity.
 */
public class PartDTO implements Serializable {

    private Long id;

    @NotNull
    private String ownerWallet;

    @NotNull
    private BigDecimal percentage;

    private CarDTO car;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOwnerWallet() {
        return ownerWallet;
    }

    public void setOwnerWallet(String ownerWallet) {
        this.ownerWallet = ownerWallet;
    }

    public BigDecimal getPercentage() {
        return percentage;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
    }

    public CarDTO getCar() {
        return car;
    }

    public void setCar(CarDTO car) {
        this.car = car;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PartDTO)) {
            return false;
        }

        PartDTO partDTO = (PartDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, partDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PartDTO{" +
            "id=" + getId() +
            ", ownerWallet='" + getOwnerWallet() + "'" +
            ", percentage=" + getPercentage() +
            ", car=" + getCar() +
            "}";
    }
}
