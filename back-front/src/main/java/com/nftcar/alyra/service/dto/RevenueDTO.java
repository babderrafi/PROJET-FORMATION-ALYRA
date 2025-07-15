package com.nftcar.alyra.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.nftcar.alyra.domain.Revenue} entity.
 */
public class RevenueDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant month;

    @NotNull
    private BigDecimal amountEur;

    @NotNull
    private BigDecimal amountUsdc;

    private CarDTO car;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getMonth() {
        return month;
    }

    public void setMonth(Instant month) {
        this.month = month;
    }

    public BigDecimal getAmountEur() {
        return amountEur;
    }

    public void setAmountEur(BigDecimal amountEur) {
        this.amountEur = amountEur;
    }

    public BigDecimal getAmountUsdc() {
        return amountUsdc;
    }

    public void setAmountUsdc(BigDecimal amountUsdc) {
        this.amountUsdc = amountUsdc;
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
        if (!(o instanceof RevenueDTO)) {
            return false;
        }

        RevenueDTO revenueDTO = (RevenueDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, revenueDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RevenueDTO{" +
            "id=" + getId() +
            ", month='" + getMonth() + "'" +
            ", amountEur=" + getAmountEur() +
            ", amountUsdc=" + getAmountUsdc() +
            ", car=" + getCar() +
            "}";
    }
}
