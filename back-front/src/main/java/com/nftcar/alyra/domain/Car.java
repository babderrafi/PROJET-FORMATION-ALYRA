package com.nftcar.alyra.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "nft_id", nullable = false)
    private String nftId;

    @NotNull
    @Column(name = "total_parts", nullable = false)
    private Integer totalParts;

    @NotNull
    @Column(name = "purchase_price", precision = 21, scale = 2, nullable = false)
    private BigDecimal purchasePrice;

    @NotNull
    @Column(name = "admin_fees", precision = 21, scale = 2, nullable = false)
    private BigDecimal adminFees;

    @NotNull
    @Column(name = "tokenization_cost", precision = 21, scale = 2, nullable = false)
    private BigDecimal tokenizationCost;

    @NotNull
    @Column(name = "maintenance_provision", precision = 21, scale = 2, nullable = false)
    private BigDecimal maintenanceProvision;

    @NotNull
    @Column(name = "management_margin", precision = 21, scale = 2, nullable = false)
    private BigDecimal managementMargin;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Car id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Car name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNftId() {
        return this.nftId;
    }

    public Car nftId(String nftId) {
        this.setNftId(nftId);
        return this;
    }

    public void setNftId(String nftId) {
        this.nftId = nftId;
    }

    public Integer getTotalParts() {
        return this.totalParts;
    }

    public Car totalParts(Integer totalParts) {
        this.setTotalParts(totalParts);
        return this;
    }

    public void setTotalParts(Integer totalParts) {
        this.totalParts = totalParts;
    }

    public BigDecimal getPurchasePrice() {
        return this.purchasePrice;
    }

    public Car purchasePrice(BigDecimal purchasePrice) {
        this.setPurchasePrice(purchasePrice);
        return this;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public BigDecimal getAdminFees() {
        return this.adminFees;
    }

    public Car adminFees(BigDecimal adminFees) {
        this.setAdminFees(adminFees);
        return this;
    }

    public void setAdminFees(BigDecimal adminFees) {
        this.adminFees = adminFees;
    }

    public BigDecimal getTokenizationCost() {
        return this.tokenizationCost;
    }

    public Car tokenizationCost(BigDecimal tokenizationCost) {
        this.setTokenizationCost(tokenizationCost);
        return this;
    }

    public void setTokenizationCost(BigDecimal tokenizationCost) {
        this.tokenizationCost = tokenizationCost;
    }

    public BigDecimal getMaintenanceProvision() {
        return this.maintenanceProvision;
    }

    public Car maintenanceProvision(BigDecimal maintenanceProvision) {
        this.setMaintenanceProvision(maintenanceProvision);
        return this;
    }

    public void setMaintenanceProvision(BigDecimal maintenanceProvision) {
        this.maintenanceProvision = maintenanceProvision;
    }

    public BigDecimal getManagementMargin() {
        return this.managementMargin;
    }

    public Car managementMargin(BigDecimal managementMargin) {
        this.setManagementMargin(managementMargin);
        return this;
    }

    public void setManagementMargin(BigDecimal managementMargin) {
        this.managementMargin = managementMargin;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Car)) {
            return false;
        }
        return id != null && id.equals(((Car) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Car{" +
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
