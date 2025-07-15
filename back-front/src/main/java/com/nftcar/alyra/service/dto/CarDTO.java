package com.nftcar.alyra.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.nftcar.alyra.domain.Car} entity.
 */
public class CarDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String nftId;

    @NotNull
    private Integer totalParts;

    @NotNull
    private BigDecimal purchasePrice;

    @NotNull
    private BigDecimal adminFees;

    @NotNull
    private BigDecimal tokenizationCost;

    @NotNull
    private BigDecimal maintenanceProvision;

    @NotNull
    private BigDecimal managementMargin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNftId() {
        return nftId;
    }

    public void setNftId(String nftId) {
        this.nftId = nftId;
    }

    public Integer getTotalParts() {
        return totalParts;
    }

    public void setTotalParts(Integer totalParts) {
        this.totalParts = totalParts;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public BigDecimal getAdminFees() {
        return adminFees;
    }

    public void setAdminFees(BigDecimal adminFees) {
        this.adminFees = adminFees;
    }

    public BigDecimal getTokenizationCost() {
        return tokenizationCost;
    }

    public void setTokenizationCost(BigDecimal tokenizationCost) {
        this.tokenizationCost = tokenizationCost;
    }

    public BigDecimal getMaintenanceProvision() {
        return maintenanceProvision;
    }

    public void setMaintenanceProvision(BigDecimal maintenanceProvision) {
        this.maintenanceProvision = maintenanceProvision;
    }

    public BigDecimal getManagementMargin() {
        return managementMargin;
    }

    public void setManagementMargin(BigDecimal managementMargin) {
        this.managementMargin = managementMargin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CarDTO)) {
            return false;
        }

        CarDTO carDTO = (CarDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, carDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CarDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nftId='" + getNftId() + "'" +
            ", totalParts=" + getTotalParts() +
            ", purchasePrice=" + getPurchasePrice() +
            ", adminFees=" + getAdminFees() +
            ", tokenizationCost=" + getTokenizationCost() +
            ", maintenanceProvision=" + getMaintenanceProvision() +
            ", managementMargin=" + getManagementMargin() +
            "}";
    }
}
